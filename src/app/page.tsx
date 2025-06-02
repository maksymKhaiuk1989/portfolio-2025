"use client";
import { Screen, Sound, Button } from "@/components";
import { WelcomeWindow } from "@/components/WelcomeWindow";

export default function Home() {
  return (
    <div>
      <Screen>
        <WelcomeWindow />
        <div className="flex flex-col gap-4 max-w-[600px]">
          {/* <TypewriterSequence>
            <Typewriter
              text="HELLO! ANONYMOUS USER"
              className="text-6xl mb-6"
              speed={80}
            />
            <Typewriter
              text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..."
              className="text-xl"
            />
            <Typewriter
              text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..."
              className="text-xl "
            />
          </TypewriterSequence> */}
          <Button className="mt-4">Next track</Button>
        </div>
      </Screen>
      <Sound />
    </div>
  );
}
