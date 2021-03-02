﻿using System.Drawing;
using System.Threading.Tasks;

namespace MandelServer.Interfaces
{
	interface IMandelbrotGenerator
	{
		Task<Image> GenerateAsync(double centerX, double centerY, double pixelToWorldScale, int numIterations);
	}
}
