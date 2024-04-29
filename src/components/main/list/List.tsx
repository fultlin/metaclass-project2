import { MouseEventHandler, useState } from "react";
import Card from "../components/card/Card";
import { Link } from "react-router-dom";
import MultiDropdown from "./components/multiDropDown/MultiDropDown";
import Input from "./components/input/Input";
import { Option } from "./components/multiDropDown/MultiDropDown";
import SearchIcon from "./components/searchicon/SearchIcon";
import React from "react";
import RepoStore from "../../../store/RepoStore/RepoStore";
import TypeDropDown from "./components/typeDropDown/TypeDropDown";



interface ListProps {
    currentRepos: any[];
    onClickPrev: MouseEventHandler<HTMLButtonElement>;
    onClickNext: MouseEventHandler<HTMLButtonElement>;
    indexOfFirstRepo: number;
    indexOfLastRepo: number;
    result: any[];
    page: number;
    totalPages: number;
    setPage: any;
    setName: (name: string) => void;
    setType: (name: string) => void;
}

const List = ({ currentRepos, onClickPrev, onClickNext, indexOfFirstRepo, indexOfLastRepo, result, page, totalPages, setPage, setName, setType }: ListProps) => {

    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = React.useState<Option[]>([]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleSearchClick = () => {
        setName(inputValue);
    };

    const handleNewType = (value: string) => {
        setType(value)
    }

    return (
        <div className="main">
            <h1>List of organization repositories</h1>
            <div className="seletcs">
                {/* <MultiDropdown
                    className={'search__drop'}
                    options={[
                        { key: 'msk', value: 'Москва' },
                        { key: 'spb', value: 'Санкт-Петербург' },
                        { key: 'ekb', value: 'Екатеринбург' }
                    ]}
                    value={value}
                    onChange={setValue}
                    getTitle={(values: Option[]) => values.length === 0 ? 'Выберите город' : `Выбрано: ${values.length}`}
                /> */}
                {/* <TypeDropDown/> */}
                <TypeDropDown onChange={handleNewType}/>
                <div className="inputSearchBlock">
                    <Input value={inputValue} onChange={handleInputChange} className="search__input--input"id="inputSearch"></Input>
                    <SearchIcon onSearch={handleSearchClick}/>
                </div>
            </div>
            <div>
                <ul className="repos">
                    {currentRepos.map(repo => (
                        <Link key={repo.id} to={'/repo/:name'}>
                            <Card id={repo.id} owner={repo.owner} name={repo.name} description={repo.description} stargazers_count={repo.stargazers_count} updated_at={repo.updated_at}/>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="repos__navigation">
                <button onClick={onClickPrev} disabled={indexOfFirstRepo === 0} className="button">
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.62 26.5599L11.9267 17.8666C10.9 16.8399 10.9 15.1599 11.9267 14.1333L20.62 5.43994"  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                    <button key={number} onClick={() => RepoStore.setPage(number)} disabled={number === page} className="page-number">
                        {number}
                    </button>
                ))}
                <button onClick={onClickNext} disabled={indexOfLastRepo >= result.length} className="button">
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.38 26.5599L21.0733 17.8666C22.1 16.8399 22.1 15.1599 21.0733 14.1333L12.38 5.43994"  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default List;