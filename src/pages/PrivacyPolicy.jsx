import React from "react";
import { Container } from "../components/shared/layout/Container";
import { Heading } from "../components/shared/common/Heading";

export const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <Heading level={1} align="center" className="mb-8">
            Privacy <span className="text-[#4CAF50]">Policy</span>
          </Heading>

          <div className="space-y-6 text-[#424242]">
            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Information We Collect
              </h2>
              <p className="mb-4">
                BP-Fuel collects health data that you voluntarily provide,
                including blood pressure readings, meal information, and
                personal health metrics. All data is stored locally on your
                device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To provide personalized health insights and recommendations
                </li>
                <li>To track your health progress over time</li>
                <li>
                  To generate health reports for your medical consultations
                </li>
                <li>To improve our health analysis algorithms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Data Security
              </h2>
              <p className="mb-4">
                Your health data is stored locally on your device using browser
                localStorage. We do not transmit your personal health
                information to external servers without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Your Rights
              </h2>
              <p className="mb-4">
                You have the right to delete your data at any time through the
                History page. You can also export your data for personal use or
                medical consultations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#212121] mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
                <span className="text-[#4CAF50] font-medium">
                  {" "}
                  support@bpfuel.com
                </span>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};
