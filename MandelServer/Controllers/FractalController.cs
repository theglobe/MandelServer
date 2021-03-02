using System.Diagnostics;
using MandelServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DomainLogic;
using System.IO;
using System.Drawing.Imaging;
using Microsoft.Net.Http.Headers;
using MandelServer.Interfaces;

namespace MandelServer.Controllers
{
	public class FractalController : Controller
	{
		private readonly ILogger<FractalController> _logger;

		public FractalController(ILogger<FractalController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}

		[HttpGet]
		public async System.Threading.Tasks.Task<FileResult> MandelbrotAsync(double centerX, double centerY, double pixelToWorldScale, int numIterations)
		{
			IMandelbrotGenerator generator = new MandelbrotGenerator(768, 512);
			var image = await generator.GenerateAsync(centerX, centerY, pixelToWorldScale, numIterations);

			MemoryStream stream = new MemoryStream();
			image.Save(stream, ImageFormat.Gif);
			stream.Seek(0, SeekOrigin.Begin);
			return new FileStreamResult(stream, new MediaTypeHeaderValue("image/gif"))
			{
				FileDownloadName = "mandelbrot.gif"
			};
		}
	}
}
