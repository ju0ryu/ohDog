import React, { useEffect } from 'react';
import MyFeedArticle from './MyFeedArticle';
import '../css/myFeedList.scss';

const MyFeedList = ({ myfeedlist, handlelist }) => {
  useEffect(() => {
    handlelist();
  }, []);
  if (myfeedlist.myfeedList.length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="myfeedlistbox">
        <table width="700px" align="center">
          <tbody>
            {myfeedlist.myfeedList.map((article) => {
              return (
                <MyFeedArticle
                  article={article}
                  key={article.fnum}
                  handlelist={handlelist}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};
export default MyFeedList;
