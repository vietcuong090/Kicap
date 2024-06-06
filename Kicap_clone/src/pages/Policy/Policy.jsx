import { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { policys } from '~/../data';
import EvoBlogHeader from '~/components/EvoBlogHeader/EvoBlogHeader';
import './Policy.scss';

const Policy = () => {
  const { title } = useParams();
  const handleFindPolicy = useCallback(() => {
    return policys.find((policy) => {
      return policy.navigate === title;
    });
  }, [title]);

  const [policyState, setPolicy] = useState(handleFindPolicy);

  useEffect(() => {
    setPolicy(handleFindPolicy);
  }, [handleFindPolicy]);
  return (
    <section className='policy-page'>
      <EvoBlogHeader
        title={policyState.title}
        image={
          'https://bizweb.dktcdn.net/100/436/596/themes/834446/assets/evo-page-banner.jpg?1689998079606'
        }
        color='black'
      ></EvoBlogHeader>
      <div className='policy-content'>
        <div className='container'>
          {Object.keys(policyState).length !== 0 &&
            policyState.data.map((child, index) => (
              <p className='paragraph' key={index}>
                {child.map((item, i) => {
                  return item.isText ? (
                    <Fragment key={i}>{item.p}</Fragment>
                  ) : item.isStrong ? (
                    <strong key={i}>{item.p}</strong>
                  ) : item.isLink ? (
                    <a
                      key={i}
                      href={`mailto:${item.to}`}
                      target='_blank'
                      className='p-link text-hover-primary'
                      rel='noreferrer'
                    >
                      {item.p}
                    </a>
                  ) : (
                    ''
                  );
                })}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Policy;
