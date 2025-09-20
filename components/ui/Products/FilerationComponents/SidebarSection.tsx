// components/SidebarSection.js
import styled from "styled-components";

const SectionContainer = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h4`
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 12px;
  font-weight: bold;
`;

export default function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionContainer>
      <Title>{title}</Title>
      {children}
    </SectionContainer>
  );
}
