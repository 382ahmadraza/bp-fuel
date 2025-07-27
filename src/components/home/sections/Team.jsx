import React from "react";
import { Container } from "../../shared/layout/Container";
import { Heading } from "../../shared/common/Heading";
import { TeamCard } from "../../shared/common/TeamCard";
import { teamData } from "../../../data";

export const Team = () => {
  const teamMembers = [
    {
      name: "Ahmad Raza",
      role: "MERN Stack Developer",
      image:
        "ahmad.jpg",
      description:
        "Experienced developer specializing in MERN stack technologies, with a focus on building efficient and scalable web applications.",
    },
    {
      name: "Muhammad Shehzaib Amin",
      role: "Media Manager",
      image:
        "shehzaib.jpg",
      description:
        "A seasoned media manager with expertise in digital marketing, content strategy, and brand management, helping companies grow their online presence.",
    },
  ];

  return (
    <section className="py-20 bg-white lg:w-[70%] m-auto">
      <Container>
        <div
           
          className={`text-center mb-12 transition-all duration-700 ease-out`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dedicated team combines technical expertise and healthcare
            knowledge to deliver the most advanced health monitoring solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              image={member.image}
              color="#4CAF50"
              delay={index * 0.2}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
