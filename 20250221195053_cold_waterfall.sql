/*
  # Create surveys table

  1. New Tables
    - `surveys`
      - `id` (uuid, primary key)
      - `unit` (text)
      - `location` (jsonb)
      - `personnel` (jsonb)
      - `description` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `surveys` table
    - Add policies for authenticated users to:
      - Create their own surveys
      - Read their own surveys
      - Update their own surveys
      - Delete their own surveys
*/

CREATE TABLE IF NOT EXISTS surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit text NOT NULL,
  location jsonb NOT NULL,
  personnel jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

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