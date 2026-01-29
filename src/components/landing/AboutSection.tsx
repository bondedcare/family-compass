import { Heart, Shield, Clock, Users } from "lucide-react";
export const AboutSection = () => {
  const values = [{
    icon: <Heart className="w-7 h-7" />,
    title: "Kindness First",
    description: "We treat everyone with warmth, respect, and genuine care—like we would our own family."
  }, {
    icon: <Shield className="w-7 h-7" />,
    title: "Trustworthy & Reliable",
    description: "When we say we'll be there, we mean it. You can count on us to follow through."
  }, {
    icon: <Clock className="w-7 h-7" />,
    title: "Flexible & Understanding",
    description: "Life happens. We work around your schedule and adapt to your needs."
  }, {
    icon: <Users className="w-7 h-7" />,
    title: "Here for Families",
    description: "Whether you're nearby or far away, we help families care for the people they love."
  }];
  return;
};