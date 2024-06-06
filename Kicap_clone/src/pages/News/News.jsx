import { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import unidecode from 'unidecode';
import { news } from '~/../data';
import ArticleTag from '~/components/ArticleTag/ArticleTag';
import FormComment from '~/components/FormComment/FormComment';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import './News.scss';

const News = () => {
  const { title } = useParams();
  const [newsState] = useState(() => {
    return news.find((newsItem) => {
      return unidecode(newsItem.title.toLowerCase()).split(' ').join('-') === title;
    });
  });

  useEffect(() => {
    document.title = newsState.title;
  }, [title, newsState]);

  return (
    <>
      <SectionBreadCrumb parent='tin tức' child={newsState.title}></SectionBreadCrumb>
      <div className='article'>
        <div className='container'>
          <h1 className='title-head'>{newsState.title}</h1>
          <div className='postby'>
            Đăng bởi <b>Kicap</b> vào lúc {newsState.createdAt}
          </div>
          <div className='article-details'>
            {Object.keys(newsState).length !== 0 &&
              newsState.paragraph.map((child, index) => (
                <p className='paragraph' key={index}>
                  {child.map((item, index) => {
                    return item.isText ? (
                      <span key={index} className='p-text'>
                        {item.data}
                      </span>
                    ) : item.isStrong ? (
                      <strong key={index} className='p-strong'>
                        {item.data}
                      </strong>
                    ) : item.isLink ? (
                      <a
                        key={index}
                        href={item.url}
                        target='_blank'
                        className='p-link'
                        rel='noreferrer'
                      >
                        {item.data}
                      </a>
                    ) : item.isHeading ? (
                      <span key={index} className='p-heading'>
                        {item.data}
                      </span>
                    ) : (
                      ''
                    );
                  })}
                </p>
              ))}
          </div>

          {/* tag */}
          {Object.keys(newsState).length !== 0 && newsState.tags.length > 0 && (
            <ArticleTag newsState={newsState}></ArticleTag>
          )}

          {/* article toolbar */}
          <div className='article-toolbar'>
            <div className='article-toolbar-left'>
              <span className='article-toolbar-head'>Bạn đang xem: </span>
              <span className='article-toolbar-title' title={newsState.title}>
                {newsState.title}
              </span>
            </div>
            <div className='article-toolbar-right'>
              <Link to='' className='article-toolbar-link'>
                <GoChevronLeft></GoChevronLeft>
                <span> Bài trước</span>
              </Link>
              <span className='separator'></span>
              <Link to='' className='article-toolbar-link'>
                <span>Bài sau </span>
                <GoChevronRight></GoChevronRight>
              </Link>
            </div>
          </div>

          {/* article comment */}
          <FormComment></FormComment>
        </div>
      </div>
    </>
  );
};

export default News;
