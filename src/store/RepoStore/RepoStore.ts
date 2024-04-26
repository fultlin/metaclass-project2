import { makeAutoObservable } from "mobx";
import axios from "axios";
import { searchStore } from "store/SearchStore/searchStore";

interface Repo {
    name: string;
    owner: {
        avatar_url: string | undefined;
    };
    id: number;
    description: string;
}

class RepoStore {
    repos: Repo[] = [];
    page: number = 1;
    name: string = 'ktsstudio';
    repoPerPage: number = 9;

    constructor() {
        makeAutoObservable(this);
        this.setName = this.setName.bind(this);
        this.fetchRepos();
    }

    fetchRepos(): void {
        axios.get<Repo[]>(`https://api.github.com/orgs/${this.name}/repos`)
            .then(response => {
                this.repos = response.data;
            })
            .catch(error => {
                console.error("Не удалось получить репозитории", error);
            });
    }

    setName(newName: string): void {
        this.name = newName;
        this.fetchRepos();
    }


    setPage(newPage: number): void {
        this.page = newPage;
    }

    get currentRepos(): Repo[] {
        const indexOfLastRepo = this.page * this.repoPerPage;
        const indexOfFirstRepo = indexOfLastRepo - this.repoPerPage;
        return this.repos.slice(indexOfFirstRepo, indexOfLastRepo);
    }

    get totalPages(): number {
        return Math.ceil(this.repos.length / this.repoPerPage);
    }
}

export default new RepoStore();