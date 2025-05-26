import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 3-5 business days depending on your location.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, we offer a 7-day return policy from the date of delivery.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer: "Yes, we do offer cash on delivery for most locations.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with tracking information.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-heading">📌 Frequently Asked Questions</h2>
      <div className="faq-items">
        {faqData.map((faq, index) => (
          <div className="faq-box" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>
            <div
              className={`faq-answer ${activeIndex === index ? 'show' : ''}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
