import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import { useCallback } from "react";

import { FaUsers } from 'react-icons/fa';
import { FaUserTie } from "react-icons/fa";
import { BsChatSquareQuoteFill } from "react-icons/bs";


const role = localStorage.getItem('active')

const SidebarContent = (props) => {
  const ref = useRef();
  const path = useLocation();




  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
          
            </li>

            {/* <li className="menu-title">{props.t("Apps")}</li> */}

            <li>
              <Link to="/dashboard/" className=" ">
                <i className="bx bx-calendar"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/chat" className="">
                <i className="bx bx-chat"></i>
                <span>{props.t("Chat")}</span>
              </Link>
            </li>
            <li>
              <Link to="/apps-filemanager">
                <i className="bx bx-file"></i>
                <span>{props.t("File Manager")}</span>
              </Link>
            </li> */}

            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <FaUserTie size={17} style={{ marginRight: '6px' }} />
                  <span>{props.t("Staff")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/all-staffs">{props.t("Staffs")}</Link>
                  </li>
                  <li>
                    <Link to="/add-staffs">{props.t("Add Staff")}</Link>
                  </li>
                </ul>
              </li>

            ) : null}





            {role === 'BDO' ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <FaUserTie size={17} style={{ marginRight: '6px' }} />
                  <span>{props.t("Customers")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/all/staff/customers/">{props.t("Customers")}</Link>
                  </li>
                  <li>
                    <Link to="/add/staff/customer/">{props.t("Add Customers")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}


            {role === 'BDM' ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <FaUserTie size={17} style={{ marginRight: '6px' }} />
                  <span>{props.t("Customers")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/managed/staff/customer/">{props.t("Customers")}</Link>
                  </li>
                  <li>
                    <Link to="/add/staff/customer/">{props.t("Add Customers")}</Link>
                  </li>
                  <li>
                    <Link to="/customers/beposoft">{props.t("bulk customer upload")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}

            {role === 'BDM' ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Order")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/staff/new/order/">{props.t("new order")}</Link>
                  </li>
                  <li>
                    <Link to="/managed/family/order/">{props.t("order list")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}

            {role === 'BDO' ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Order")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/staff/new/order/">{props.t("new order")}</Link>
                  </li>
                  <li>
                    <Link to="/staff/order/list/">{props.t("order list")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}


            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <FaUserTie size={17} style={{ marginRight: '6px' }} />
                  <span>{props.t("purchase")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/add/products/">{props.t("Purchase")}</Link>
                  </li>
                  <li>
                    <Link to="/add/products/bulk/">{props.t("Bulk Order Creation")}</Link>
                  </li>
                  <li>
                    <Link to="/product/list/">{props.t("Purchase List")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}

            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (

              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Customers")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/all-customers/">{props.t("Customers")}</Link>
                  </li>
                  <li>
                    <Link to="/add-customers/">{props.t("Add Customers")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}

            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (


              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Supervisor")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/all-supervisors/">{props.t("Supervisors")}</Link>
                  </li>
                  <li>
                    <Link to="/add-supervisors/">{props.t("add Supervisors")}</Link>
                  </li>
                </ul>
              </li>

            ) : null}

            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (

              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("States")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/all-states/">{props.t("States")}</Link>
                  </li>
                </ul>
              </li>

            ) : null}

            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (


              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Department")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/all-departments/">{props.t("Departments")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (


              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Family")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/all-families/">{props.t("Families")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (


              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Attribute")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/attributes/">{props.t("attribute")}</Link>
                  </li>
                  <li>
                    <Link to="/attribute-values/">{props.t("attribute-values")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}

            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (


              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Order")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/New/Order/">{props.t("new order")}</Link>
                  </li>
                  <li>
                    <Link to="/Orders/">{props.t("order list")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}


            <li>
              <Link to="/#" className="has-arrow">
                <FaUsers size={20} style={{ marginRight: '8px' }} />
                <span>{props.t("Perfoma Invoice")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/create/perfoma/invoice/">{props.t("new Perfoma invoice")}</Link>
                </li>
                <li>
                  <Link to="/perfoma/invoices/">{props.t("Perfoma invoices")}</Link>
                </li>
              </ul>
            </li>


            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (

              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Bank")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/add/bank/">{props.t("Add Bank")}</Link>
                  </li>
                  <li>
                    <Link to="/bank/datas/">{props.t("Bank List")}</Link>
                  </li>
                  <li>
                    <Link to="/bank/bankmodule">{props.t("Bank Module")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (

              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Company")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/add/beposoft/company/details/">{props.t("Add company")}</Link>
                  </li>
                  <li>
                    <Link to="/beposoft/companies/">{props.t("Companies")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT'  || role === 'warehouse admin' ? (


              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("GRV")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/beposoft/new/grv/">{props.t("new grv")}</Link>
                  </li>
                  <li>
                    <Link to="/beposoft/grv/view/">{props.t("grv list")}</Link>
                  </li>
                </ul>
              </li>

            ) : null}
            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' || role === 'warehouse admin' ? (


              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("DELIVERY NOTES")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/delivery/notes/">{props.t("delivery-notes")}</Link>
                  </li>
                  <li>
                    <Link to="/daily/good/movment/">{props.t("Daily Good Movment")}</Link>
                  </li>
                  <li>
                    <Link to="/order/postoffice/">{props.t("Post Office Report")}</Link>
                  </li>
                </ul>
              </li>
            ) : null}


{role === 'ADMIN' || role === 'ACCOUNTS' || role === 'warehouse admin' ? (


<li>
<Link to="/order/warehousee/" className=" ">
  <i className="bx bx-box"></i>
  <span>{props.t("order request")}</span>
</Link>
</li>
) : null}



       {(role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT') && (
  <>
    {/* Expense Section */}
    <li>
      <Link to="/#" className="has-arrow">
        <FaUsers size={20} style={{ marginRight: '8px' }} />
        <span>{props.t("Expense")}</span>
      </Link>
      <ul className="sub-menu" aria-expanded="false">
        <li>
          <Link to="/add/expense/">{props.t("Add Expense")}</Link>
        </li>
        <li>
          <Link to="/expense/list/">{props.t("Expenses")}</Link>
        </li>
      </ul>
    </li>

    {/* Warehouse Section */}
    <li>
      <Link to="/#" className="has-arrow">
        <FaUsers size={20} style={{ marginRight: '8px' }} />
        <span>{props.t("Warehouse")}</span>
      </Link>
      <ul className="sub-menu" aria-expanded="false">
        <li>
          <Link to="/add/warehouse/">{props.t("Add Warehouse")}</Link>
        </li>

      </ul>
    </li>
  </>
)}

            {role === 'ADMIN' || role === 'ACCOUNTS' || role === 'IT' ? (

              <li>
                <Link to="/#" className="has-arrow">
                  <FaUsers size={20} style={{ marginRight: '8px' }} />
                  <span>{props.t("Reports")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/sales/reports/">{props.t("Sales Report")}</Link>
                  </li>
                  <li>
                    <Link to="/credit/sale/">{props.t("Credit Sales")}</Link>
                  </li>
                  <li>
                    <Link to="/COD/sales/resport/">{props.t("COD Sales Report")}</Link>
                  </li>

                  <li>
                    <Link to="/states/sales/resport/">{props.t("States Sales Report")}</Link>
                  </li>
                  <li>
                    <Link to="/expense/report/">{props.t("Expense Report")}</Link>
                  </li>
                  <li>
                    <Link to="/Delivery/report/">{props.t("Delivery Report")}</Link>
                  </li>
                  <li>
                    <Link to="/product/sold/report/">{props.t("Product Sold Report")}</Link>
                  </li>
                  <li>
                    <Link to="/product/stock/report/">{props.t("Product Stock Report")}</Link>
                  </li>
                </ul>
              </li>


            ) : null}


            {/* <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Ecommerce")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ecommerce-products">{props.t("Products")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-product-detail/1">
                    {props.t("Product Detail")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-orders">{props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-customers">{props.t("Customers")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-cart">{props.t("Cart")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-checkout">{props.t("Checkout")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-shops">{props.t("Shops")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-product">
                    {props.t("Add Product")}
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-bitcoin"></i>
                <span>{props.t("Crypto")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/crypto-wallet">{props.t("Wallet")}</Link>
                </li>
                <li>
                  <Link to="/crypto-buy-sell">{props.t("Buy/Sell")}</Link>
                </li>
                <li>
                  <Link to="/crypto-exchange">{props.t("Exchange")}</Link>
                </li>
                <li>
                  <Link to="/crypto-lending">{props.t("Lending")}</Link>
                </li>
                <li>
                  <Link to="/crypto-orders">{props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="/crypto-kyc-application">
                    {props.t("KYC Application")}
                  </Link>
                </li>
                <li>
                  <Link to="/crypto-ico-landing">{props.t("ICO Landing")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-envelope"></i>
                <span>{props.t("Email")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/email-inbox">{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="/email-read">{props.t("Read Email")} </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="t-email-templates">{props.t("Templates")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/email-template-basic">
                        {props.t("Basic Action")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/email-template-alert">
                        {props.t("Alert Email")}{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/email-template-billing">
                        {props.t("Billing Email")}{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-receipt"></i>
                <span>{props.t("Invoices")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/invoices-list">{props.t("Invoice List")}</Link>
                </li>
                <li>
                  <Link to="/invoices-detail">{props.t("Invoice Detail")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-briefcase-alt-2"></i>
                <span>{props.t("Projects")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/projects-grid">{props.t("Projects Grid")}</Link>
                </li>
                <li>
                  <Link to="/projects-list">{props.t("Projects List")}</Link>
                </li>
                <li>
                  <Link to="/projects-overview">
                    {props.t("Project Overview")}
                  </Link>
                </li>
                <li>
                  <Link to="/projects-create">{props.t("Create New")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-task"></i>
                <span>{props.t("Tasks")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/tasks-list">{props.t("Task List")}</Link>
                </li>
                <li>
                  <Link to="/tasks-kanban">{props.t("Tasks Kanban")}</Link>
                </li>
                <li>
                  <Link to="/tasks-create">{props.t("Create Task")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-user-detail"></i>
                <span>{props.t("Contacts")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/contacts-grid">{props.t("User Grid")}</Link>
                </li>
                <li>
                  <Link to="/contacts-list">{props.t("User List")}</Link>
                </li>
                <li>
                  <Link to="/contacts-profile">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-detail" />

                <span>{props.t("Blog")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/blog-list">{props.t("Blog List")}</Link>
                </li>
                <li>
                  <Link to="/blog-grid">{props.t("Blog Grid")}</Link>
                </li>
                <li>
                  <Link to="/blog-details">{props.t("Blog Details")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#">

                <i className="bx bx-briefcase-alt"></i>
                <span key="t-jobs">{props.t("Jobs")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/job-list">{props.t("Job List")}</Link>
                </li>
                <li>
                  <Link to="/job-grid">{props.t("Job Grid")}</Link>
                </li>
                <li>
                  <Link to="/job-apply">{props.t("Apply Job")}</Link>
                </li>
                <li>
                  <Link to="/job-details">{props.t("Job Details")}</Link>
                </li>
                <li>
                  <Link to="/job-categories">{props.t("Jobs Categories")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    Candidate
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/candidate-list">{props.t("List")}</Link>
                    </li>
                    <li>
                      <Link to="/candidate-overview">{props.t("Overview")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="menu-title">Pages</li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-user-circle"></i>
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/pages-login-2">{props.t("Login 2")}</Link>
                </li>
                <li>
                  <Link to="/pages-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/pages-register-2">{props.t("Register 2")}</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-recoverpw-2">
                    {props.t("Recover Password 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen">{props.t("Lock Screen")}</Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen-2">
                    {props.t("Lock Screen 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail">{props.t("Confirm Mail")}</Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail-2">
                    {props.t("Confirm Mail 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-email-verification">
                    {props.t("Email Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-email-verification-2">
                    {props.t("Email Verification 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification">
                    {props.t("Two Step Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification-2">
                    {props.t("Two Step Verification 2")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-file"></i>
                <span>{props.t("Utility")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/pages-starter">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="/pages-maintenance">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="/pages-comingsoon">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="/pages-timeline">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="/pages-pricing">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="/pages-404">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="/pages-500">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Components")}</li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-tone"></i>
                <span>{props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-offcanvas">{props.t("OffCanvas")}</Link>
                </li>
                <li>
                  <Link to="/ui-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/ui-session-timeout">
                    {props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-placeholders">{props.t("Placeholders")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-toasts">{props.t("Toasts")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="/ui-rating">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="/ui-notifications">{props.t("Notifications")}</Link>
                </li>
                <li>
                  <Link to="/ui-utilities">{props.t("Utilities")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="">
                <i className="bx bxs-eraser"></i>
                <span className="badge rounded-pill bg-danger float-end">
                  10
                </span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/form-elements">{props.t("Form Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-layouts">{props.t("Form Layouts")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-repeater">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-list-ul"></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/tables-basic">{props.t("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("Data Tables")}</Link>
                </li> */}
            {/* <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive Table")}
                  </Link>
                </li> */}
            {/* <li>
                  <Link to="/tables-dragndrop">
                    {props.t("Drag & Drop Table")}
                  </Link>
                </li> */}
            {/* </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-bar-chart-alt-2"></i>
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/apex-charts">{props.t("Apex charts")}</Link>
                </li>
                <li>
                  <Link to="/e-charts">{props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">{props.t("Chartjs Chart")}</Link>
                </li>

                <li>
                  <Link to="/charts-knob">{props.t("Knob Charts")}</Link>
                </li>
                <li>
                  <Link to="/sparkline-charts">
                    {props.t("Sparkline Chart")}
                  </Link>
                </li>
                <li>
                  <Link to="/re-charts">{props.t("Re Chart")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-aperture"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-map"></i>
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/maps-google">{props.t("Google Maps")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-share-alt"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="true">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
