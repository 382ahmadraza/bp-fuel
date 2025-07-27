import React from "react";
import { Container } from "../../shared/layout/Container";
import StatCard from "../../shared/common/StatCard";
import { statsData } from "../../../data";

export const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <Container>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <StatCard
              key={stat.id}
              {...stat}
              delay={index * 200}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
