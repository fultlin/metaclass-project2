
import React from "react";
import { Key } from "react"
import { Link } from "react-router-dom";
import Raiting from "./components/Raiting";

import './Card.module.scss'


const Card = React.memo((data: {
    description: string;
    name: string; id: Key | null | undefined; owner: {
        [x: string]: any; avatar_url: string | undefined 
} ;
    stargazers_count: number;
    updated_at: string;
}) => {
    
    const dateStr = data.updated_at;
    const dateObj = new Date(Date.parse(dateStr));

    const months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthIndex = dateObj.getUTCMonth();
    const formattedDate = `Updated ${dateObj.getUTCDate()} ${months[monthIndex]}`;

    const addViewed = () => {
        let viewedRepos = JSON.parse(localStorage.getItem('viewedRepos') || '[]');

        const info = {
          ava: data.owner.avatar_url,
          name: data.name,
          owner: data.owner.login,
        };
      
        const isDuplicate = viewedRepos.some((repo: string) => {
          const parsedRepo = JSON.parse(repo);
          return (
            parsedRepo.ava === info.ava &&
            parsedRepo.name === info.name &&
            parsedRepo.owner === info.owner
          );
        });
      
        if (!isDuplicate) {
          viewedRepos.unshift(JSON.stringify(info));
      
          if (viewedRepos.length > 5) {
            viewedRepos = viewedRepos.slice(0, 5);
          }
      
          localStorage.setItem('viewedRepos', JSON.stringify(viewedRepos));
        }
      };


    return (
        <li key={data.id} className="card" onClick={addViewed}>
            <Link to={`/${data.owner.login}/${data.name}`}>
                <img src={data.owner.avatar_url} alt="Картинка репозитория" />
                <div className="card__raiting-date">
                    <div className="raiting">
                        <Raiting/>
                        <span>{data.stargazers_count}</span>
                    </div>
                    <span>{formattedDate}</span>
                </div>
                <div className="card__description">
                    <h3 className="card__title">{data.name}</h3>
                    <span className="card__description">{data.description}</span>
                </div>
            </Link>
        </li>
        
    )
})

export default Card