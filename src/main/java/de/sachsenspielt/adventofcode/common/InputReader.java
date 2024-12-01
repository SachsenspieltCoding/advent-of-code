package de.sachsenspielt.adventofcode.common;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class InputReader {

    public static String[] readInputFile(String fileName)  {
        Class<InputReader> clazz = InputReader.class;
        InputStream inputStream = clazz.getResourceAsStream("/" + fileName);

        try {
            return readFromInputStream(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static String[] readFromInputStream(InputStream inputStream) throws IOException {
        ArrayList<String> strings = new ArrayList<String>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = br.readLine()) != null) {
                strings.add(line);
            }
        }
        return strings.toArray(new String[0]);
    }
}
