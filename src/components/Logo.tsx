export default function Logo() {
  const skills = [
    { name: "HTML", src: "/logos/html.png" },
    { name: "CSS", src: "/logos/css.png" },
    { name: "JavaScript", src: "/logos/js.png" },
    { name: "TypeScript", src: "/logos/ts.png" },
    { name: "React", src: "/logos/react.png" },
    { name: "PHP", src: "/logos/php.png" },
    { name: "NodeJS", src: "/logos/node.png" },
    { name: "C", src: "/logos/c.png" },
    { name: "Express", src: "/logos/express.png" },
    { name: "MongoDB", src: "/logos/mongo.png" },
    { name: "Git", src: "/logos/git.png" },
    { name: "PostgreSQL", src: "/logos/postgresql.png" },
    { name: "Bash", src: "/logos/bash.png" },
    { name: "Kotlin", src: "/logos/kotlin.png" },
    { name: "Go", src: "/logos/go.png" },
  ];

  return (
<div className="skills-glass">
  <div className="skills-wrapper">
    <div className="skills-track">
      {[...skills, ...skills].map((skill, index) => (
        <div className="skill-item" key={index}>
          <img src={skill.src} alt={skill.name} />
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
