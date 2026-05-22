import styles from "./ProjectRequirements.module.css";

const FALLBACK_REQUIREMENTS = [
  {
    title: "Blueprint And Supplementary",
    desc: "Detailed structural blueprints and supplementary engineering documentation reviewed and approved prior to installation commencement.",
  },
  {
    title: "Expense Without Paving Cost",
    desc: "Comprehensive project cost analysis prepared excluding foundation and paving works, ensuring full financial transparency for the client.",
  },
  {
    title: "Building Prior Estimation",
    desc: "Pre-construction assessment of shaft dimensions, load capacity, and building specifications to guarantee a perfect fit and optimal performance.",
  },
];

export default function ProjectRequirements({ requirements }) {
  const items = requirements?.length > 0 ? requirements : FALLBACK_REQUIREMENTS;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Requirements</h2>
        <div className={styles.list}>
          {items.map((req, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemLeft}>
                <h3 className={styles.itemTitle}>{req.title}</h3>
                <p className={styles.itemDesc}>{req.desc || req.description}</p>
              </div>
              <span className={styles.itemNumber}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
