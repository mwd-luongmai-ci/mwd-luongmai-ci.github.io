(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-home-home-module"],{

/***/ "./src/app/features/home/home-page/home-page.component.html":
/*!******************************************************************!*\
  !*** ./src/app/features/home/home-page/home-page.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-grid-list cols=\"4\" rowHeight=\"2:1\">\n    <mat-grid-tile *ngFor=\"let user of users\">\n        <mat-card [style.width]=\"'100%'\" [style.height]=\"'100px'\">\n            <mat-card-header>\n                <div mat-card-avatar class=\"user-avatar\"></div>\n                <mat-card-title>{{user.name}}</mat-card-title>\n                <mat-card-subtitle>{{user.username}} (<span *ngIf=\"user.active; else inActive\">Active</span>)<ng-template\n                        #inActive><span>Inactive</span></ng-template>\n                </mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-actions>\n                <a mat-button color=\"warn\" *ngIf=\"user.active\" (click)=\"deactivateUser(user.id)\" class=\"text-warning\">\n                    <mat-icon><i class=\"material-icons md-dark\">block</i></mat-icon>Deactivate\n                </a>\n            </mat-card-actions>\n        </mat-card>\n    </mat-grid-tile>\n</mat-grid-list>"

/***/ }),

/***/ "./src/app/features/home/home-page/home-page.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/features/home/home-page/home-page.component.ts ***!
  \****************************************************************/
/*! exports provided: HomePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageComponent", function() { return HomePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services */ "./src/app/core/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(authenticationService, userService, router) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.router = router;
        this.users = [];
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
    }
    HomePageComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
    };
    HomePageComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    };
    HomePageComponent.prototype.deleteUser = function (id) {
        var _this = this;
        this.userService.delete(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(function () {
            _this.loadAllUsers();
        });
    };
    HomePageComponent.prototype.deactivateUser = function (id) {
        var _this = this;
        this.userService.deactivate(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(function () {
            if (_this.currentUser.id === id) {
                _this.authenticationService.invalidate();
                _this.router.navigate(['/login']);
            }
            else {
                _this.loadAllUsers();
            }
        });
    };
    HomePageComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(function (users) {
            _this.users = users;
        });
    };
    HomePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({ template: __webpack_require__(/*! ./home-page.component.html */ "./src/app/features/home/home-page/home-page.component.html") }),
        __metadata("design:paramtypes", [_core_services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
            _core_services__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HomePageComponent);
    return HomePageComponent;
}());



/***/ }),

/***/ "./src/app/features/home/home-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/features/home/home-routing.module.ts ***!
  \******************************************************/
/*! exports provided: HomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home-page/home-page.component */ "./src/app/features/home/home-page/home-page.component.ts");
/* harmony import */ var _app_core_guards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/core/guards */ "./src/app/core/guards/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_2__["HomePageComponent"],
        canActivate: [_app_core_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]],
    },
    {
        path: '',
        children: [
            { path: 'home-page', component: _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_2__["HomePageComponent"], canActivate: [_app_core_guards__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
        ]
    }
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());



/***/ }),

/***/ "./src/app/features/home/home.module.ts":
/*!**********************************************!*\
  !*** ./src/app/features/home/home.module.ts ***!
  \**********************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/features/home/home-routing.module.ts");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home-page/home-page.component */ "./src/app/features/home/home-page/home-page.component.ts");
/* harmony import */ var _app_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/core */ "./src/app/core/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_3__["HomePageComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_2__["HomeRoutingModule"],
                _app_core__WEBPACK_IMPORTED_MODULE_4__["CustomMaterialModule"],
            ]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ })

}]);
//# sourceMappingURL=features-home-home-module.js.map