import React from 'react';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';
import List from './list/List';
import RepoPage from './repoPage/RepoPage';
import repoStore from '../../store/RepoStore/RepoStore';

const Main = observer(() => {
    const prevPage = () => {
        if (repoStore.page > 1) {
            repoStore.setPage(repoStore.page - 1);
        }
    };

    const nextPage = () => {
        if (repoStore.page < repoStore.totalPages) {
            repoStore.setPage(repoStore.page + 1);
        }
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<List
                    currentRepos={repoStore.currentRepos}
                    onClickPrev={prevPage}
                    onClickNext={nextPage}
                    indexOfFirstRepo={(repoStore.page - 1) * repoStore.repoPerPage}
                    indexOfLastRepo={repoStore.page * repoStore.repoPerPage}
                    result={repoStore.repos}
                    page={repoStore.page}
                    totalPages={repoStore.totalPages}
                    setPage={repoStore.setPage}
                    setName={repoStore.setName}
                    setType={repoStore.setType}
                />}
            />
            <Route path="/:name" element={<RepoPage nameAcc={repoStore.name} />} />
        </Routes>
    );
});

export default Main;
