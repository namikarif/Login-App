import {Directive, ElementRef, HostListener} from '@angular/core';

declare const $: any;

@Directive({
  selector: '[naNavDropdown]'
})
export class NavDropDownDirective {
  private static hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
  }

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  toggle(event) {
    if (NavDropDownDirective.hasClass(document.querySelector('body'), 'aside-collapsed')) {
      event.preventDefault();
    } else {
      const target = $(event.target || event.srcElement || event.currentTarget);
      let ul, anchor = target;

      // find the UL
      if (!target.is('a')) {
        anchor = target.parent('a').first();
      }
      ul = anchor.next();

      if (!ul.length) {
        return;
      }


      if (parseInt(ul.height(), 0)) {
        this.closeMenu(ul, this.el.nativeElement);
      } else {
        ul.on('transitionend', () => {
          ul.height('auto').off('transitionend');
        }).height(ul[0].scrollHeight);
        ul.addClass('opening');
        this.el.nativeElement.classList.add('open');
      }
    }
  }

  closeMenu(elem, el) {
    elem.height(elem[0].scrollHeight);
    elem.height(0);
    elem.removeClass('opening');
    if (elem[0].previousElementSibling) {
      elem[0].previousElementSibling.classList.remove('open');
    }
  }
}

@Directive({
  selector: '[naMouseHover]'
})
export class NavDropDownToggleDirective {
  // Check if element has class
  private static hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
  }

  constructor() {
  }

  @HostListener('mouseenter', ['$event'])
  toggleSubmenuHover(event) {
    const self = this;
    if (NavDropDownToggleDirective.hasClass(document.querySelector('body'), 'aside-collapsed')) {
      const isFixed = true;
      event.preventDefault();
      this.removeFloatingNav();
      const target = $(event.target || event.srcElement || event.currentTarget);
      let ul, anchor = target;
      if (!target.is('a')) {
        anchor = target.parent('a');
      }
      ul = anchor.next();
      if (!ul.length) {
        return;
      }
      const $aside = $('.aside');
      const navDropDown = $('.nav-dropdown-toggle');
      const $asideInner = $aside.children('.aside-inner'); // for top offset calculation
      const $sidebar = $asideInner.children('.sidebar');
      // const $li = $nav.children('li');
      const mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0) + 81;
      const itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop() - 3;
      const floatingNav = ul.clone().appendTo($aside);
      const vwHeight = $(window).height();
      navDropDown.removeClass('open');
      floatingNav
        .removeClass('opening')
        .addClass('nav-floating')
        .css({
          overflowY: 'auto',
          height: 'auto',
          position: isFixed ? 'fixed' : 'absolute',
          top: itemTop,
          maxHeight: (vwHeight - itemTop) - 8,
        });
      // floatingNav.wrap( "<div class='floating-menu'></div>" );
      floatingNav
        .find('a').on('click', function (e) {
        const $subNav = e.currentTarget.parentElement.children;
        if ($subNav.length > 1) {
          const subTarget = $(e.target || e.srcElement || e.currentTarget);
          let subUl, subAnchor = subTarget;
          if (!subTarget.is('a')) {
            subAnchor = subTarget.parent('a').first();
          }
          subUl = subAnchor.next();
          if (!subUl.length) {
            return;
          }
          if (parseInt(subUl.height(), 0)) {
            subUl.height(subUl[0].scrollHeight);
            subUl.height(0);
            subUl.removeClass('opening');
            subUl[0].previousElementSibling.classList.remove('open');
          } else {
            subUl.on('transitionend', () => {
              subUl.height('auto').off('transitionend');
            }).height(subUl[0].scrollHeight);
            subUl.addClass('opening');
            e.currentTarget.classList.add('open');
          }
        } else {
          const currentTag: any = document.getElementById(e.currentTarget.id).children[0];
          currentTag.click();
          $('.nav-floating').remove();
        }
      });
      this.listenForExternalClicks();
    }
  }

  listenForExternalClicks() {
    const $doc = $(document).on('click.sidebar', (e) => {
      if (!$(e.target).parents('.aside').length) {
        this.removeFloatingNav();
        $doc.off('click.sidebar');
      }
    });
  }

  removeFloatingNav() {
    $('.nav-floating').remove();
  }
}
