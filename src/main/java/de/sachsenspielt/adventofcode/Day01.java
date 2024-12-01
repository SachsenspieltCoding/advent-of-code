package de.sachsenspielt.adventofcode;

import java.util.ArrayList;

public class Day01 extends Day {

    Day01() {
        super("01");
    }

    @Override
    public int part01(String[] input) {
        int output = 0;
        
        ArrayList<Integer> list1 = new ArrayList<>();
        ArrayList<Integer> list2 = new ArrayList<>();
        
        for (String line : input) {
            String[] splittedString = line.replaceAll(" {3}", " ").split(" ");
            list1.add(Integer.parseInt(splittedString[0]));
            list2.add(Integer.parseInt(splittedString[1]));
        }
        
        list1.sort(Integer::compareTo);
        list2.sort(Integer::compareTo);

        for (int i = 0; i < list1.size(); i++) {
            output += Math.abs(list1.get(i) - list2.get(i));
        }
        
        return output;
    }

    @Override
    public int part02(String[] input) {
        int output = 0;

        ArrayList<Integer> list1 = new ArrayList<>();
        ArrayList<Integer> list2 = new ArrayList<>();

        for (String line : input) {
            String[] splittedString = line.replaceAll(" {3}", " ").split(" ");
            list1.add(Integer.parseInt(splittedString[0]));
            list2.add(Integer.parseInt(splittedString[1]));
        }

        for (int num : list1) {
            output += (int) (num * list2.stream().filter(integer -> integer == num).count());
        }

        return output;
    }
}
