import { CadastroService } from './cadastro.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FilmeSerie } from '../models/filmeSerie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService],
})
export class CadastroComponent implements OnInit {
  uploadedFiles: any[] = [];
  filmeSerieBody = new FilmeSerie();
  imgBase64: string = '';

  id: number = 0;

  constructor(
    private messageService: MessageService,
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarDadosPeloId(this.id);
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(file);

      if (file) {
        const reader = new FileReader();
        //convertendo a IMG para base64
        reader.onload = (e: any) => {
          const base64Image = e.target.result;

          console.log(base64Image);
          const base64SemPrefixo = base64Image.split(',')[1];
          this.imgBase64 = base64SemPrefixo;
        };

        reader.readAsDataURL(file);
      }
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Upload da imagem feito com sucesso',
      detail: '',
    });
  }

  cadastrarFilmeSerie() {
    this.filmeSerieBody.imagemBase64 = this.imgBase64;

    this.cadastroService
      .adicionarFilmeSerie(this.filmeSerieBody)
      .subscribe((cadastrar) => {
        if (cadastrar != null) {
          console.log(cadastrar);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso !',
            detail: 'Cadastrado feito com sucesso',
          });
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 2000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro no cadastro :(',
          });
        }
      });
  }

  buscarDadosPeloId(id: number) {
    this.cadastroService.buscarPeloID(id).subscribe((response) => {
      this.filmeSerieBody = response;
      console.log(response);
    });
  }

}
