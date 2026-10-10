const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const { data, error } = await supabase.from("appointments").insert([
    {
      patient_name: "test",
      phone_number: "test",
      appointment_date: "2026-10-10",
      reason_for_visit: "Other",
      status: "Pending",
    },
  ]);
  
  if (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  } else {
    console.log("Success:", data);
  }
}

testInsert();
