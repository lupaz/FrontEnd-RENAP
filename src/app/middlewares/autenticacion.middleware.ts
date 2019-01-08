import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({ providedIn: 'root' })
export class AutenticacionMiddleware implements CanActivate {
        constructor(private autenticacion: AutenticacionService, private router: Router) { }

        canActivate() {
                if (!this.autenticacion.estaAutenticado()) {
                        this.router.navigateByUrl('/');
                        return false;
                }
                // this.router.navigateByUrl('/docentes');
                return true;
        }
}
