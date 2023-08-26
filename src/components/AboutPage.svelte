<div>
  <p>
    <strong>GUESSTHEWORD</strong> is a Wordle clone where you have to guess the
    hidden word in 6 tries or less.<br />After every word entered, the tiles
    will show how close (or far) you are from the correct answer:
  </p>
  <div class="mt-4 flex gap-1 items-center">
    <p
      style:color={"white"}
      style:background-color={"green"}
      class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
    >
      T
    </p>
    <p
      style:color={"white"}
      style:background-color={"gray"}
      class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
    >
      A
    </p>
    <p
      style:color={"white"}
      style:background-color={"gray"}
      class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
    >
      B
    </p>
    <p
      style:color={"white"}
      style:background-color={"orange"}
      class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
    >
      L
    </p>
    <p
      style:color={"white"}
      style:background-color={"gray"}
      class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
    >
      E
    </p>
  </div>

  <ul class="">
    <li class="mt-4 flex items-end gap-2">
      <div
        style:color={"white"}
        style:background-color={"green"}
        class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
      >
        T
      </div>
      A green tile tells you the letter is in the right place.
    </li>
    <li class="mt-2 flex items-end gap-2">
      <div
        style:color={"white"}
        style:background-color={"gray"}
        class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
      >
        A
      </div>
      A gray tile tells you the letter is not part of the word.
    </li>
    <li class="mt-2 flex items-end gap-2">
      <div
        style:color={"white"}
        style:background-color={"orange"}
        class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
      >
        L
      </div>
      An orange tile tells you the letter is part of the word but it isn't in the
      right place.
    </li>
  </ul>
  <p class="mt-4">
    Pay close attention to the hints, <strong
      >words can have repeated letters</strong
    >.
  </p>
</div>
