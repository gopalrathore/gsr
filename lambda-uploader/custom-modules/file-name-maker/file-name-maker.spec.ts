import { FileNameMaker } from './file-name-maker';
import * as assert from "assert";

let fileNameMaker:FileNameMaker = new FileNameMaker();

describe('file name maker', function () {
  describe('#getFileName()', function () {
    it('should return string when the function called', function () {
      assert.equal(typeof (fileNameMaker.getFileName('pdf', 50)), 'string');
    });
    it('should return 29 string length when the function called', function () {
      assert.equal(fileNameMaker.getFileName('pdf', 50).length, 29);
    });
  });
});