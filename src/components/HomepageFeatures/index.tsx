import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('/img/clipboard-check.svg').default,
    description: (
      <>
        Eneris was designed with efficiency and customizability in mind to enable
        you to do your best work.
      </>
    ),
  },
  {
    title: 'Complete Reports On-Site',
    Svg: require('/img/devices.svg').default,
    description: (
      <>
        Deliver a full property inspection report with photos and videos included
        before leaving the property.
      </>
    ),
  },
  {
    title: 'Fit for all property inspectors',
    Svg: require('/img/people.svg').default,
    description: (
      <>
        Suitable for self-employed inspectors, small to midsize businesses, and
        large enterprises involved in property inspections.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img"/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
          <Link
            className="button button--primary button--lg"
            to="/docs/overview">
            See documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
