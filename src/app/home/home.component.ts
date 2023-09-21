import { MessageService } from 'primeng/api';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { FilmeSerie } from '../models/filmeSerie';
import { CadastroService } from '../cadastro/cadastro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  filmesList = new Array<FilmeSerie>();
  filmeSerieBody = new FilmeSerie();
  constructor(
    private homeService: HomeService,
    private messageService: MessageService,
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarFilme();
  }

  buscarFilme() {
    this.homeService.buscarFilmes().subscribe((buscarTodos: any) => {
      this.filmesList = buscarTodos;
      console.log(this.filmesList);
    });
  }

  deletar(id: number) {
    return this.homeService.deletar(id).subscribe((deletar) => {
      console.log(deletar);
      this.messageService.add({
        severity: 'success',
        summary: 'Deletado com sucesso',
        detail: 'Deletado',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  buscarDadosPeloId(id: number) {
    this.cadastroService.buscarPeloID(id).subscribe((response) => {
      this.filmeSerieBody = response;
      console.log(response);
      this.homeService.setId(id);
      this.router.navigate(['/cadastro']);
    });
  }

editar(id:number){
  this.homeService.setId(id);
  this.router.navigate([`/cadastro`,id])
}

}
