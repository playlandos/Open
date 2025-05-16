import React, { useState } from 'react';

export default function Booking({ boat }) {
  const [form, setForm] = useState({ name: '', email: '', date: '', extras: false });
  const handleSubmit = async e => {
    e.preventDefault();
    const total = boat.price + (form.extras ? 20 : 0);
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, boatId: boat.id, boatName: boat.name, total })
    });
    if (res.ok) {
      alert("Booking submitted! Please check your email for payment instructions.");
    } else {
      alert("Booking failed. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" />
      <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" />
      <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} type="date" />
      <label>
        <input type="checkbox" checked={form.extras} onChange={e => setForm({...form, extras: e.target.checked})} />
        Include Extras (€20)
      </label>
      <button type="submit">Book Now</button>
    </form>
  );
}
