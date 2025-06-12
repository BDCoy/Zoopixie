/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  email text unique not null,
  child_name text not null,
  avatar_url text,
  drawings_count integer default 0,
  videos_count integer default 0,
  age_verified boolean default false,
  birth_year integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 

create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (
    id,
    email,
    child_name,
    drawings_count,
    videos_count,
    age_verified,
    created_at
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'child_name',
    (new.raw_user_meta_data->>'drawings_count')::int,
    (new.raw_user_meta_data->>'videos_count')::int,
    (new.raw_user_meta_data->>'age_verified')::boolean,
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create type video_status_enum as enum (
  'TASK_STATUS_QUEUED',
  'TASK_STATUS_SUCCEED',
  'TASK_STATUS_FAILED',
  'TASK_STATUS_PROCESSING'
);

create table ai_videos (
  id serial primary key,  -- Unique identifier for the video
  user_id uuid references users(id) on delete cascade,  -- Associate the video with a user
  video_url text not null,  -- URL to the generated video
  video_title text not null,  -- Title or description for the video
  video_status video_status_enum default 'TASK_STATUS_PROCESSING',  -- Use ENUM for task status
  generated_at timestamp with time zone default now(),  -- Timestamp for when the video was generated
  updated_at timestamp with time zone default now()  -- Timestamp for the last update
);

create or replace function update_video_count()
returns trigger as $$
begin

  update users
  set videos_count = videos_count + 1
  where id = new.user_id;
  return new;
end;
$$ language plpgsql;

create trigger video_count_trigger
  after insert on ai_videos
  for each row execute function update_video_count();
