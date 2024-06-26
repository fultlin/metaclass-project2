import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import Card from "../components/card/Card";
import Input from "./components/input/Input";
import SearchIcon from "./components/searchicon/SearchIcon";
import TypeDropDown from "./components/typeDropDown/TypeDropDown";
import repoStore from "../../../store/RepoStore/RepoStore";
import { log } from "console";

interface ListProps {
    currentRepos: any;
    onClickPrev: () => void;
    onClickNext: () => void;
    indexOfFirstRepo: number;
    indexOfLastRepo: number;
    result: any;
    page: number;
    totalPages: number;
    setPage: (newPage: number) => void;
    setName: (newName: string) => void;
    setType: (newType: string) => void;
}

const List: React.FC<ListProps> = observer(() => {
    const { currentRepos, totalPages, setName, setPage, setType } = repoStore;
    const location = useLocation();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [viewedRepos, setViewedRepos] = useState<any[]>([]);
    const [showViewedRepos, setShowViewedRepos] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pageQuery = query.get('page');
        const nameQuery = query.get('name');
        const typeQuery = query.get('type');

        if (pageQuery) setPage(Number(pageQuery));
        if (nameQuery) setName(nameQuery);
        if (typeQuery) setType(typeQuery);
    }, [location.search]);

    const handleInputChange = useCallback((value: string) => {
        setInputValue(value);
    }, []);

    const handleSearchClick = useCallback(() => {
        const query = new URLSearchParams(location.search);
        query.set('name', inputValue);
        query.set('page', '1'); 
        navigate({ search: query.toString() });
        setName(inputValue);
    }, [inputValue, location.search, navigate, setName]);

    const handleNewType = useCallback((value: string) => {
        const query = new URLSearchParams(location.search);
        query.set('type', value);
        query.set('page', '1'); 
        navigate({ search: query.toString() });
        setType(value);
    }, [location.search, navigate, setType]);

    const onClickPrev = useCallback(() => {
        const newPage = repoStore.page - 1;
        const query = new URLSearchParams(location.search);
        query.set('page', newPage.toString());
        navigate({ search: query.toString() });
        setPage(newPage);
    }, [location.search, navigate, setPage]);

    const onClickNext = useCallback(() => {
        const newPage = repoStore.page + 1;
        const query = new URLSearchParams(location.search);
        query.set('page', newPage.toString());
        navigate({ search: query.toString() });
        setPage(newPage);
    }, [location.search, navigate, setPage]);

    const onClickView = useCallback(() => {
        const storedRepos = JSON.parse(localStorage.getItem('viewedRepos') || '[]');
        const parsedRepos = storedRepos.map((repo: string) => JSON.parse(repo));
        setViewedRepos(parsedRepos);
        setShowViewedRepos(true);
    }, []);


    return (
        <div className="main">
            <h1>List of organization repositories</h1>
            <div className="seletcs">
                <TypeDropDown onChange={handleNewType} />
                <div className="inputSearchBlock">
                    <div className="search">
                        <Input value={inputValue} onChange={handleInputChange} className="search__input--input" id="inputSearch"></Input>
                        <SearchIcon onSearch={handleSearchClick} />
                    </div>
                    <div onClick={onClickView}>
                        <h2 className="last-repos">Last repos</h2>
                        {showViewedRepos && (
                            <ul className="viewed-repos" style={{ marginLeft: '10px' }}>
                                {viewedRepos.length > 0 ? (
                                    viewedRepos.map(rep => (
                                        <li key={rep.name} className="viewed-repo">
                                            <Link to={`/${rep.owner}/${rep.name}`}>{rep.name}</Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>No viewed repos</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <ul className="repos">
                {currentRepos.length > 0 ? 
                    currentRepos.map(repo => (
                        <Card key={repo.id} id={repo.id} owner={repo.owner} name={repo.name} description={repo.description} stargazers_count={repo.stargazers_count} updated_at={repo.updated_at} />    
                    )) :
                    <div className="start-block">There you will see repos</div>
                }
            </ul>

            <div className="repos__navigation">
                {currentRepos.length > 0 ?
                    <button onClick={onClickPrev} disabled={repoStore.page === 1} className="button">
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.62 26.5599L11.9267 17.8666C10.9 16.8399 10.9 15.1599 11.9267 14.1333L20.62 5.43994" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                : ''}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                    <button key={number} onClick={() => {
                        const query = new URLSearchParams(location.search);
                        query.set('page', number.toString());
                        navigate({ search: query.toString() });
                        setPage(number);
                    }} disabled={number === repoStore.page} className="page-number">
                        {number}
                    </button>
                ))}
                {currentRepos.length > 0 ?
                    <button onClick={onClickNext} disabled={repoStore.page === totalPages} className="button">
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.38 26.5599L21.0733 17.8666C22.1 16.8399 22.1 15.1599 21.0733 14.1333L12.38 5.43994" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                : ''
                }
                
            </div>
        </div>
    );
});

export default List;
