import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import './Markdown.scss';

function Markdown () {
  useEffect(() => {
    document.querySelectorAll('table').forEach((table) => {
      if (!Array.from(table.parentNode.classList).includes('div-table')) {
        const divElement = document.createElement('div');
        divElement.className = 'div-table';
        table.parentNode.replaceChild(divElement, table);
        divElement.appendChild(table);
      }
    });
  });

  useEffect(() => {
    if (!sessionStorage.markdown) {
      getDocument('?id=27626713&name=markdown');
    }
  }, []);

  // 获取文档信息
  function getDocument (query) {
    fetch(`/getDocument${query}`, { method: 'GET', credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem('markdown', data.users[data.users.length - 1].content);
      })
      .catch(err => {
        console.log(err);
      })
  }

  console.log('markdown')

  return (
    <div className="markdown-page">
      <textarea
        readOnly
        className="markdown-grammar"
        spellCheck="false"
        defaultValue={sessionStorage.markdown} />
      <div className="markdown-preview">
        <ReactMarkdown source={sessionStorage.markdown} />
      </div>
    </div>
  )
}

export default Markdown;