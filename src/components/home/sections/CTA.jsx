import React from "react";
import { motion } from "framer-motion";
import { Container } from "../../shared/layout/Container";
import { Heading } from "../../shared/common/Heading";
import { Button } from "../../shared/common/Button";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <Container>
        <div className="text-center">
          <Heading level={2} align="center" className="mb-6">
            Ready to Start Your Health Journey?
          </Heading>
  
          <p className="text-xl text-[#424242] mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already taking control of their
            health with BP Fuel's advanced technology.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 text-lg"
          >
            Get Started Now
          </Button>
        </div>
      </Container>
    </section>
  );
};
