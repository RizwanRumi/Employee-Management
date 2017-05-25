using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EntityFrameWorkCodeFirstExample.Models;

namespace EntityFrameWorkCodeFirstExample.Controllers
{
    public class EmployeeController : Controller
    {
        private EmployeeDbContext db = new EmployeeDbContext();

        // GET: /Employee/
        public JsonResult Index()
        {
           return Json(db.Employees.ToList(), JsonRequestBehavior.AllowGet);
            //return View(db.Employees.ToList());
        }
        public JsonResult Search(int val, string name)
        {
            var empList = db.Employees.ToList();
            
            if (!string.IsNullOrEmpty(name))
            {
                var sortedEmpList = empList.Where(e => e.FirstName.Contains(name)).OrderBy(e => e.EmployeeId).Skip(val).Take(20).ToList();
                return Json(sortedEmpList, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(empList.OrderBy(v => v.EmployeeId).Skip(val).Take(20).ToList(), JsonRequestBehavior.AllowGet);
            }
            return Json(null, JsonRequestBehavior.AllowGet);
            //return View(db.Employees.ToList());
        }

        public JsonResult GetSelectedTotalRows(string fName)
        {
            var sortedEmpList = db.Employees.Where(e => e.FirstName.Contains(fName)).ToList();
            return Json(sortedEmpList, JsonRequestBehavior.AllowGet);
        }
       
        //public ActionResult Index()
        //{
        //    //return Json(db.Employees.ToList(), JsonRequestBehavior.AllowGet);
        //    return View(db.Employees.ToList());
        //}

        // GET: /Employee/Details/5
        //public ActionResult Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Employee employee = db.Employees.Find(id);
        //    if (employee == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(employee);
        //}
        public JsonResult Details(int? id)
        {
           
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return Json(employee, JsonRequestBehavior.AllowGet);
            }
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
        // GET: /Employee/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Employee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include="EmployeeId,FirstName,LastName,Address,Phone")] Employee employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Employees.Add(employee);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return View(employee);
        //}

        public JsonResult Create([Bind(Include = "EmployeeId,FirstName,LastName,Address,Phone")] Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                // return Json(nu, JsonRequestBehavior.AllowGet);
            }

            return Json(employee, JsonRequestBehavior.AllowGet);
        }

        // GET: /Employee/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            return View(employee);
        }

        // POST: /Employee/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit([Bind(Include="EmployeeId,FirstName,LastName,Address,Phone")] Employee employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Entry(employee).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View(employee);
        //}
        public JsonResult Edit([Bind(Include = "EmployeeId,FirstName,LastName,Address,Phone")] Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
                return Json("updated",JsonRequestBehavior.AllowGet);
            }
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
        // GET: /Employee/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            return View(employee);
        }

        // POST: /Employee/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Employee employee = db.Employees.Find(id);
            db.Employees.Remove(employee);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
