import React from "react";
import { Container } from "../components/shared/layout/Container";
import { Heading } from "../components/shared/common/Heading";

export const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <Heading level={1} align="center" className="mb-8">
            Terms <span className="text-[#4CAF50]">of</span> Service
          </Heading>

          <div className="space-y-6 text-[#424242]">
            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Acceptance of Terms
              </h2>
              <p className="mb-4">
                By using BP-Fuel, you agree to these Terms of Service. If you do
                not agree to these terms, please do not use our application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Medical Disclaimer
              </h2>
              <p className="mb-4">
                BP-Fuel is a health monitoring tool and does not replace
                professional medical advice, diagnosis, or treatment. Always
                consult with qualified healthcare providers for medical
                concerns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                User Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate health information for better analysis</li>
                <li>
                  Use the application responsibly and not for emergency medical
                  situations
                </li>
                <li>Consult healthcare professionals for medical decisions</li>
                <li>Keep your device secure to protect your health data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Limitation of Liability
              </h2>
              <p className="mb-4">
                BP-Fuel and its developers are not liable for any health
                decisions made based on the application's analysis or
                recommendations. Users assume full responsibility for their
                health decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Changes to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time.
                Continued use of the application constitutes acceptance of any
                changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Contact Information
              </h2>
              <p>
                For questions about these Terms of Service, contact us at:
                <span className="text-[#4CAF50] font-medium">
                  {" "}
                  legal@bpfuel.com
                </span>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};
