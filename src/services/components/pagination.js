import React, { Component } from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';




export default class PaginationComponent extends Component {


render(){
  const pageLinks = [];
  const {currentPage, pages, nextPage} = this.props;
  let firstPage;
  if (currentPage <= 3) {
    firstPage = 1;
  } else {
    firstPage = currentPage - 2;
  }

 
  let lastPage = firstPage + 4;
  if (lastPage >pages) {
    lastPage = pages;
  }

  
  for (let i = firstPage; i <= lastPage; i++) {
    let active = currentPage == i ? 'active' : '';

    pageLinks.push(
      <li className={`pageNum ${active}`} key={i} onClick={() => nextPage(i)}>
        <a href="#">{i}</a>
      </li>
    );
  }
  

  return (
    <div className="site-content-pagination">
      <div className="row">


        <ul className="pagination">
          
          {currentPage > 1 ? (
            <li className={'pageNum'} onClick={() => nextPage(currentPage - 1)}>
              <a href="#">
                <LeftOutlined />
              </a>
            </li>
          ) : (
            ''
          )}
          {pageLinks}
          {currentPage < pages ? (
            <li className={'pageNum'} onClick={() => nextPage(currentPage + 1)}>
              <a href="#">
                <RightOutlined />
              </a>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

}


