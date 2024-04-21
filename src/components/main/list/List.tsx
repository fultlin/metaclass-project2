import { MouseEventHandler } from "react";
import Card from "../components/card/Card";
import { Link } from "react-router-dom";
import MultiDropdown from "./components/multiDropDown/MultiDropDown";
import Input from "./components/input/Input";
import { Option } from "./components/multiDropDown/MultiDropDown";


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
}

const List = ({ currentRepos, onClickPrev, onClickNext, indexOfFirstRepo, indexOfLastRepo, result, page, totalPages, setPage }: ListProps) => {
    return (
        <div className="main">
            <h1>List of organization repositories</h1>
            <div className="seletcs">
                <MultiDropdown className={'search__drop'} options={[
                    { key: 'msk', value: 'Москва' },
                    { key: 'spb', value: 'Санкт-Петербург' },
                    { key: 'ekb', value: 'Екатеринбург' }
                    ]}
                    value={[{ key: 'msk', value: 'Москва' }]} onChange={() => ({ key, value }: Option) => console.log('Выбрано:', key, value)}
                    getTitle={(values: Option[]) => values.length === 0 ? 'Выберите город' : `Выбрано: ${values.length}`} >
                        
                </MultiDropdown>
                <div className="inputSearchBlock">
                    <Input onChange={() => { return }} className="search__input--input"></Input>
                    <div className="searchIcon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_508_313)">
                                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_508_313">
                                <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
            <div>
                <ul className="repos">
                    {currentRepos.map(repo => (
                        <Link to={'/repo/:name'}>
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
                    <button key={number} onClick={() => setPage(number)} disabled={number === page} className="page-number">
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