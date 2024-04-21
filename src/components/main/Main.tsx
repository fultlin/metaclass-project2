import { useEffect, useState } from "react";
import List from "./list/List";
import RepoPage from "./repoPage/RepoPage";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

interface Repo {
    name: string;
    owner: { avatar_url: string | undefined; };
    id: number;
    description: string;
}

const Main = () => {
    const [result, setResult] = useState<Repo[]>([]);
    const [page, setPage] = useState(1);
    const repoPerPage = 9;

    useEffect(() => {
        axios.get('https://api.github.com/orgs/ktsstudio/repos').then(response => {
            setResult(response.data);
        });
    }, []);

    const indexOfLastRepo = page * repoPerPage;
    const indexOfFirstRepo = indexOfLastRepo - repoPerPage;
    const currentRepos = result.slice(indexOfFirstRepo, indexOfLastRepo);

    const totalPages = Math.ceil(result.length / repoPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<List
                    currentRepos={currentRepos}
                    onClickPrev={prevPage}
                    onClickNext={nextPage}
                    indexOfFirstRepo={indexOfFirstRepo}
                    indexOfLastRepo={indexOfLastRepo}
                    result={result}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />}
            />
            <Route path="/:name" element={<RepoPage />} />
        </Routes>
    );
};

export default Main;