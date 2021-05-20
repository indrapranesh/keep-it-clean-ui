import { AfterViewChecked, AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DropDownButtonComponent } from '@progress/kendo-angular-buttons';
import { ROUTERURL } from 'src/app/constants/url.constants';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleDrawer = new EventEmitter<any>()

  @ViewChild("profileDrop", { static: true }) public profileDrop: DropDownButtonComponent;
  isAuthenticated: boolean = false;
  avatarName = '';
  isSmallDevice = false;
  popupSettings = {
    animate: true,
    align: 'left'
  }
  navItems = [
    {
      "text": 'Laws',
      "path": '/laws'
    },
    {
      "text": 'Recycling Centers',
      "path": '/recycling'
    },
    {
      "text": 'Events',
      "path": '/events'
    },
    {
      "text": 'Carbon Footprint',
      "path": '/carbondating'
    },
  ];

  profileNav: Array<any> = [{
    text: 'My Events',
    route: ROUTERURL.MY_EVENTS
    }, {
        text: 'Logout',
        route: ROUTERURL.LOGOUT
  },{
    text: 'My Achievements',
    route: ROUTERURL.MY_ACHIEVEMENTS
  }];


  constructor(public router: Router, 
    private userService: UserService,
    private breakPointService: BreakpointService,
    private sessionService: SessionService) { 
      
  }

  profileNavigate(event) {
    this.router.navigate([event.route])
  }

  navLanding() {
    this.router.navigate([ROUTERURL.LANDING]);
  }

  open(event) {
    console.log(event);
    this.profileDrop.toggle(true);
  }

  close() {
    this.profileDrop.toggle(false);
  }

  toggleNav() {
    this.toggleDrawer.emit();
  }

  ngOnInit(): void {
    this.breakPointService.isMobileScreen.asObservable().subscribe(res => this.isSmallDevice = res)
    this.sessionService.isAuthenticated.asObservable().subscribe(
      (res) => {
        this.isAuthenticated = res;
        if(this.isAuthenticated) {
          this.avatarName = `${(this.userService.getCurrentUser()).firstName.charAt(0)}${(this.userService.getCurrentUser()).lastName.charAt(0)}`
        }
      }
    )
  }

}
