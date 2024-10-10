import React, { useState } from "react";
import "../styles/style.css";
import { SocialIcon } from "react-social-icons";
import { useLocation } from "react-router-dom"; // react-router kullanarak konum bilgisi almak için

const Footer = () => {
  const [showKVKK, setShowKVKK] = useState(false);
  const location = useLocation(); // konum bilgisini almak

  const toggleKVKKPopup = () => {
    setShowKVKK(!showKVKK);
  };

  // Home sayfasında olup olmadığını kontrol et
  const isHomePage = location.pathname === '/home';

  return (
    <footer className={`footer ${isHomePage ? 'footer-home' : 'footer-other'}`}>
      <div className="footer-left">
      </div>
      <div className="about-us">
          <p>About Us</p>
        </div>
      <div className="footer-right">
        <div className="social-links">
          <SocialIcon url="https://twitter.com" />
          <SocialIcon url="https://instagram.com" />
          <SocialIcon url="https://linkedin.com" />
        </div>

      </div>
      {showKVKK && (
        <div className="kvkk-popup">
          <p>
            Data Protection Notice Introduction This Data Protection Notice is
            prepared in accordance with the Personal Data Protection Law No.
            6698 (KVKK) of the Republic of Turkey. This notice aims to inform
            you about the collection, processing, and protection of your
            personal data by [Your Company Name]. Data Controller [Your Company
            Name], located at [Company Address], acts as the data controller as
            defined by KVKK. Purpose of Data Processing We collect and process
            personal data to provide better services to our customers, fulfill
            our legal obligations, and manage our commercial activities.
            Specifically, your personal data may be processed for the following
            purposes: To provide and improve our products and services To
            communicate with you regarding your requests or inquiries To manage
            and execute our business processes and operations To comply with
            legal and regulatory requirements Legal Basis for Data Processing
            Your personal data is processed based on the following legal
            grounds: Your explicit consent The necessity to process data for the
            performance of a contract The necessity to process data for
            compliance with a legal obligation The necessity to process data for
            the legitimate interests pursued by the data controller, provided
            that it does not harm your fundamental rights and freedoms Data
            Collection Methods We collect personal data through various methods,
            including but not limited to: Forms filled out on our website or
            mobile applications Communications via email, phone, or in-person
            Transactions conducted through our services Data Subject Rights As a
            data subject under KVKK, you have the following rights: To learn
            whether your personal data is processed To request information
            regarding the processing of your personal data To learn the purpose
            of processing your personal data and whether it is used in
            accordance with the intended purpose To know the third parties to
            whom your personal data is transferred, both domestically and
            internationally To request the correction of incomplete or
            inaccurate data To request the deletion or destruction of your
            personal data under certain conditions To object to the processing
            of your personal data that you believe is unlawful To request
            compensation for damages arising from the unlawful processing of
            your personal data Data Security We take appropriate technical and
            organizational measures to protect your personal data against
            unauthorized access, loss, alteration, or destruction. Contact
            Information For any inquiries or requests regarding your personal
            data, you can contact us at: [Your Company Name] [Company Address]
            [Email Address] [Phone Number] Updates to this Notice This Data
            Protection Notice may be updated periodically to reflect changes in
            our practices or relevant laws. We will notify you of significant
            changes through our website or other communication channels.
          </p>
          <button onClick={toggleKVKKPopup}>Close</button>
        </div>
      )}
      <p className="kvkk-link" onClick={toggleKVKKPopup}>
        PDPLK
      </p>
    </footer>
  );
};

export default Footer;
