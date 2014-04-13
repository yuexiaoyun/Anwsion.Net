using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Anwsion.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getitem(int page = 1, int pagesize = 25)
        {
            var time = DateTime.Now.ToString("yyy-mm-dd HH:MM:ss");

            var offset = (page - 1) * pagesize;
            var pagetotal = page * pagesize;
            var list = new List<dynamic>();
            for (int i = 1 + offset; i <= pagetotal && i <= 50; i++)
            {
                list.Add(new { id = i, name = string.Format("item{0}", i), time = time });
            }


            var result = new
            {
                list = list
            };
            System.Threading.Thread.Sleep(1000);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}