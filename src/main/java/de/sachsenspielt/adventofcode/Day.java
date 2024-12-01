package de.sachsenspielt.adventofcode;

import de.sachsenspielt.adventofcode.common.InputReader;

abstract public class Day {
    private final String day;
    
    Day(String day) {
        this.day = day;
    }
    
    abstract public int part01(String[] input);
    abstract public int part02(String[] input);

    public void run() {
        String[] input = InputReader.readInputFile(String.format("day%s.txt", day));
        System.out.printf("DAY %s%n", day);
        System.out.println("Part 01: " + part01(input));
        System.out.println("Part 02: " + part02(input));
        System.out.println();
    }
}
