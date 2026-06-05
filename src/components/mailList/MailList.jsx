import { useState } from "react";
import { toast } from "react-toastify";
import "./mailList.css";

const MailList = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success(`Thanks! Deals will be sent to ${email}.`);
    setEmail("");
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you.
      </span>
      <form className="mailInputContainer" onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default MailList;
