import { HttpException, HttpStatus } from "@nestjs/common";

export class ArticleNotFound extends HttpException {
  constructor(response: string = "Article was not found") {
    super(response, HttpStatus.NOT_FOUND);
  }
}

export class ArticleByIdNotFound extends ArticleNotFound {
  constructor(id: number) {
    super(`Article by ${id} id was not found`);
  }
}

export class ArticleByTitleNotFound extends ArticleNotFound {
  constructor(title: string) {
    super(`Articles by ${title} title were not found`);
  }
}

export class FavouriteArticlesNotFound extends ArticleNotFound {
  constructor() {
    super("Favourite articles were not found");
  }
}

export class FolderNotFound extends HttpException {
  constructor(response: string = "Folder was not found") {
    super(response, HttpStatus.NOT_FOUND);
  }
}

export class FolderByIdNotFound extends FolderNotFound {
	constructor(id: number) {
		super(`Folder by ${id} id was not found`)
	}
}

export class FoldersByNameNotFound extends FolderNotFound {
	constructor(name: string) {
		super(`Folders by ${name} name were not found`)
	}
}

export class FavouriteFoldersNotFound extends FolderNotFound {
  constructor() {
    super("Favourite folders were not found");
  }
}