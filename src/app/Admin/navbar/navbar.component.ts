import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbar = [];

  site_settings = [{ id: 1, name: 'Logo & Favicon', url: 'site-settings/logog-favicon' },
  { id: 2, name: 'Email', url: 'site-settings/update-email' },
  { id: 3, name: 'Basic Site Settings', url: 'site-settings/basic-settings' },
  { id: 4, name: 'Social Media Link', url: 'site-settings/social-site-settings' },
  { id: 5, name: 'Google Analytics Code', url: 'site-settings/google-analytics-code' },
  { id: 6, name: 'Change Password', url: 'site-settings/change-password' },
  { id: 7, name: 'Social App', url: 'site-settings/social-app' },
  { id: 8, name: 'Currency Management', url: 'site-settings/currency-management' },
  ];

  add_newDetails = [{ id: 1, name: 'Country', url: 'add-new-details/country' },
  { id: 2, name: 'State', url: 'state' },
  { id: 3, name: 'City', url: 'city' },
  { id: 4, name: 'Marital Status', url: 'marital-status' },
  { id: 5, name: 'Personal Titles', url: 'personal-titles' },
  { id: 6, name: 'Qualification Group', url: 'qualification-group' },
  { id: 7, name: 'Industries', url: 'industries' },
  { id: 8, name: 'Functional Area', url: 'functional-area' },
  { id: 9, name: 'Job Role', url: 'job-role' },
  { id: 10, name: 'Key Skill', url: 'key-skill' },
  { id: 11, name: 'Human Language', url: 'human-language' },
  { id: 12, name: 'Proficiency Level', url: 'proficiency-level' },
  { id: 13, name: 'Company Size', url: 'company-size' },
  { id: 14, name: 'Company Type', url: 'company-type' },
  { id: 15, name: 'Job Payment', url: 'job-payment' },
  { id: 16, name: 'Job Type', url: 'job-type' },
  { id: 17, name: 'Employment Type', url: 'employment-type' },
  { id: 18, name: 'Job-Shift-type', url: 'job-shift-type' },
  ];

  job_seeker = [{ id: 1, name: 'All Job', url: 'site-settings/logog-favicon' },
  { id: 2, name: 'Email', url: 'email' },
  { id: 3, name: 'Basic Site Settings', url: 'basic-site-settings' },
  { id: 4, name: 'Social Media Link', url: 'social-media-link' },
  { id: 5, name: 'Google Analytics Code', url: 'google-analytics-code' },
  { id: 6, name: 'Change Password', url: 'change-password' },
  { id: 7, name: 'Social App', url: 'social-app' },
  { id: 8, name: 'Currency Management', url: 'currency-management' }
  ];

  employer = [{ id: 1, name: 'All Employer', url: 'site-settings/all-employer' },
  { id: 2, name: 'Active to Paid', url: 'active-to-paid' },
  { id: 3, name: 'Paid Employer', url: 'paid-employer' },
  { id: 4, name: 'Expired Employer', url: 'expired-employer' },
  { id: 5, name: 'Dlete Request', url: 'delete-request' }
  ];

  job_listing = [{ id: 1, name: 'Job Listing', url: 'job-listing' },
  ];

  member_plan = [{ id: 1, name: 'Job Seeker Plan', url: 'job-seeker-plan' },
  { id: 2, name: 'Employer Plan to Paid', url: 'employer-plan' },
  ];
  coupon_code = [{ id: 1, name: 'Coupon Code', url: 'coupon-code' },
  ];

  approval = [{ id: 1, name: 'Job Seeker Photo', url: 'job-seeker-photo' },
  { id: 2, name: 'Job Seeker Resume', url: 'job-seeker-resume' },
  { id: 3, name: 'Employer Photo', url: 'employer-photo' },
  { id: 4, name: 'Company Logo', url: 'company-logo' },
  ];
  sale_report = [{ id: 1, name: 'Job Seeker', url: 'sales-report/job-seeker' },
  { id: 2, name: 'Employer', url: 'sales-report/job-seeker' },
  ];
  content_management = [{ id: 1, name: 'Cms Pages', url: 'content-management/cms-pages' },
  ];

  blog_management = [{ id: 1, name: 'Blog Management', url: 'blog-management/blog-list' },
  ];

  email_templates = [
    { id: 1, name: 'Email Templates', url: 'email-templates' },
    { id: 2, name: 'Add Email Templates', url: 'add-email-temolates' },
  ];

  sms_templates = [
    { id: 1, name: 'SMS Templates', url: 'sms-templates' },
    { id: 2, name: 'SMS Configuration', url: 'sms-configuration' },
  ];
  advertisement = [
    { id: 1, name: 'Advertisement', url: 'advertisement' },
  ];
  constructor(public commonservObj: CommonService) { }

  ngOnInit() {
    this.navbar = [
      { menu: 'Site Settings', sub_menu: this.site_settings },
      { menu: 'Add New Details', sub_menu: this.add_newDetails },
      { menu: 'Job Seeker', sub_menu: this.job_seeker },
      { menu: 'Employer', sub_menu: this.employer },
      { menu: 'Job Listing', sub_menu: this.job_listing },
      { menu: 'Member Plan', sub_menu: this.member_plan },
      { menu: 'Member Coupon Code', sub_menu: this.coupon_code },
      { menu: 'Approval', sub_menu: this.approval },
      { menu: 'Sales Report', sub_menu: this.sale_report },
      { menu: 'Content Management', sub_menu: this.content_management },
      { menu: 'Blog Management', sub_menu: this.blog_management },
      { menu: 'Email Templates', sub_menu: this.email_templates },
      { menu: 'SMS Templates', sub_menu: this.sms_templates },
      { menu: 'Advertisement', sub_menu: this.advertisement },
      
    ]
  }

  onLogout() {
    console.log("logout");
  }
}
