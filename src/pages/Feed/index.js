import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import { Container, DataHeader, Data, NoData, Paginator } from './styles';

export default function Posts() {
  const [postTitle, setPostTitle] = useState();
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fecthPosts(1);
  }, []); //eslint-disable-line

  async function fecthPosts(currentPage) {
    try {
      const { data } = await api.get('posts', {
        params: { q: postTitle, page: currentPage },
      });

      setPage(currentPage);
      setLastPage(data.lastPage);
      setPosts(data.content);
    } catch (err) {
      console.log(err);

      toast.error(err.response.data.error);
    }
  }

  function handlePostTitleChange(e) {
    setPostTitle(e.target.value);
  }

  async function handleDeletePost({ id }) {
    if (window.confirm(`Tem certeza que deseja deletar o post?`))  //eslint-disable-line
      try {
        await api.delete(`/posts/${id}`);

        const newPosts = posts.filter(post => post.id !== id);

        let newPage = newPosts.length ? page : page - 1;
        if (newPage === 0) {
          newPage = 1;
        }

        fecthPosts(newPage);

        toast.success('Post removido');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
  }

  function handlePreviousPageChange() {
    const currentPage = page - 1;
    fecthPosts(currentPage);
  }

  function handleNextPageChange() {
    const currentPage = page + 1;
    fecthPosts(currentPage);
  }

  return (
    <Container>
      <DataHeader>
        <strong>FEED</strong>
        <button type="button" onClick={() => history.push('/posts/new')}>
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </button>
        <span>
          <MdSearch color="#999999" size={16} />
          <input
            name="postTitle"
            placeholder="Buscar post"
            onKeyDown={event => event.key === 'Enter' && fecthPosts(1)}
            onChange={handlePostTitleChange}
          />
        </span>
      </DataHeader>

      {posts.length ? (
        <>
          <Data>

              {posts.map(post => (
                <div key={post.id}>
                  <h2>{post.title}</h2>
                  <h4>{post.text}</h4>
                  <p>Usuário {post.user_id}</p>

                    <button
                      type="button"
                      onClick={() =>
                        history.push(`/post/${post.id}/edit`)
                      }
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePost(post)}
                    >
                      apagar
                    </button>

                </div>
              ))}

          </Data>

          <Paginator>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => {
                handlePreviousPageChange();
              }}
            >
              Anterior
            </button>
            <button
              disabled={lastPage}
              type="button"
              onClick={() => {
                handleNextPageChange();
              }}
            >
              Próxima
            </button>
          </Paginator>
        </>
      ) : (
        <NoData>
          <span>Nenhum post encontrado</span>
        </NoData>
      )}
    </Container>
  );
}
