import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, User, Zap } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Speed Go</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How it works
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
          </nav>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/register">Sign Up</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Book your ride in seconds
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Fast, affordable, and convenient rides in Moradabad. Choose between auto or bike for your journey.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild size="lg">
                    <Link href="/login">Book a Ride</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/captain/register">Become a Captain</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] relative">
                <Image
                  src="/images/speedgo.png" // Path to the speedgo.png image
                  width={500}
                  height={500}
                  alt="SpeedGo Logo"
                  className="mx-auto aspect-square rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need for your journey
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a seamless experience for both riders and captains in Moradabad.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Real-time Tracking</h3>
                  <p className="text-muted-foreground">Track your ride in real-time with accurate location updates.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Navigation className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Multiple Vehicle Options</h3>
                  <p className="text-muted-foreground">
                    Choose between auto or bike based on your needs and preferences.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                  <p className="text-muted-foreground">Convenient cash payment option for all your rides.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple steps to book your ride</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to get from point A to point B in Moradabad.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Enter Location</h3>
                  <p className="text-muted-foreground">
                    Enter your pickup and drop-off locations with our auto-suggestion feature.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Choose Vehicle</h3>
                  <p className="text-muted-foreground">
                    Select between auto or bike based on your preference and requirement.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Enjoy Your Ride</h3>
                  <p className="text-muted-foreground">
                    Track your captain in real-time and pay with cash upon arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                    About Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We're committed to providing safe, reliable, and affordable transportation options in Moradabad. Our
                    platform connects riders with verified captains to ensure a seamless experience.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild variant="outline">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px]">
                <Image
                  src="/images/speedgo.png" // Path to the speedgo.png image
                  width={500}
                  height={400}
                  alt="SpeedGo Mission"
                  className="mx-auto rounded-xl object-cover w-full h-auto" // Added responsive classes
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join our platform today</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're looking for a ride or want to become a captain in Moradabad, we've got you covered.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/register">Sign Up as Rider</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/captain/register">Become a Captain</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Speed Go</span>
              </div>
              <p className="text-sm text-muted-foreground">Fast, affordable, and convenient rides in Moradabad.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-sm hover:underline">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-sm hover:underline">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm hover:underline">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="text-sm hover:underline">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-sm hover:underline">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-sm hover:underline">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:underline">
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:underline">
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:underline">
                      Facebook
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Speed Go. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-xs text-muted-foreground hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

