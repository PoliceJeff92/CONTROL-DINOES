/*
  # Create surveys table and policies

  1. New Tables
    - `surveys`
      - `id` (uuid, primary key)
      - `unit` (text)
      - `location` (jsonb)
      - `personnel` (jsonb)
      - `description` (text)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `surveys` table
    - Add policies for authenticated users to:
      - Create their own surveys
      - Read their own surveys
      - Update their own surveys
      - Delete their own surveys
*/

-- Create surveys table if it doesn't exist
CREATE TABLE IF NOT EXISTS surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit text NOT NULL,
  location jsonb NOT NULL,
  personnel jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can create their own surveys" ON surveys;
  DROP POLICY IF EXISTS "Users can read their own surveys" ON surveys;
  DROP POLICY IF EXISTS "Users can update their own surveys" ON surveys;
  DROP POLICY IF EXISTS "Users can delete their own surveys" ON surveys;
END $$;

-- Create policies
CREATE POLICY "Users can create their own surveys"
  ON surveys
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own surveys"
  ON surveys
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own surveys"
  ON surveys
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own surveys"
  ON surveys
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);