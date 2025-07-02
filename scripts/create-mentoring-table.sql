-- Create mentoring_bookings table
CREATE TABLE IF NOT EXISTS mentoring_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  business_name VARCHAR(255),
  business_type VARCHAR(100) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(20) NOT NULL,
  topics TEXT NOT NULL,
  experience_level VARCHAR(50) NOT NULL,
  challenges TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mentoring_bookings_email ON mentoring_bookings(email);
CREATE INDEX IF NOT EXISTS idx_mentoring_bookings_status ON mentoring_bookings(status);
CREATE INDEX IF NOT EXISTS idx_mentoring_bookings_date ON mentoring_bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_mentoring_bookings_created_at ON mentoring_bookings(created_at);

-- Enable Row Level Security
ALTER TABLE mentoring_bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for booking submissions)
CREATE POLICY "Allow booking submissions" ON mentoring_bookings
  FOR INSERT WITH CHECK (true);

-- Create policy to allow admin access (you can modify this based on your admin setup)
CREATE POLICY "Allow admin access" ON mentoring_bookings
  FOR ALL USING (true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mentoring_bookings_updated_at 
  BEFORE UPDATE ON mentoring_bookings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
