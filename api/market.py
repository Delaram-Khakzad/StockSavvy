class Market():
    def __init__(self, industries):
        self.industries = industries
    
    def __str__(self):
        return f"{self.industries}"
    
    def __repr__(self):
        return self.__str__()

    def get_industry(self, sic):
        for industry in self.industries:
            if industry.is_in_industry(sic):
                return industry
        return None
    
    def get_industry_names(self):
        return [industry.short_name for industry in self.industries]
    
    def get_industry_long_names(self):
        return [industry.long_name for industry in self.industries]

    def get_industry_by_id(self, id):
        for industry in self.industries:
            if industry.id == id:
                return industry
        return None

    def get_industry_by_name(self, name):
        for industry in self.industries:
            if name.strip().lower() in industry.names():
                return industry
        return None

    def get_industry_by_sic(self, sic):
        for industry in self.industries:
            if industry.is_in_industry(sic):
                return industry
        return None

    def from_file(path):
        with open(path) as f:
            data = f.readlines()
        data = parse(data)
        return Market(data)

class Industry():
    def __init__(self, id, short_name, long_name):
        self.id = id
        self.short_name = short_name
        self.long_name = long_name
        self.sic_ranges = []
    
    def from_string(string):
        string = string.strip()
        id, short_name, long_name = string.split(' ', 2)
        return Industry(int(id), short_name.strip(), long_name.strip())
    
    def add_range(self, range):
        self.sic_ranges.append(range)

    def is_in_industry(self, sic):
        for range in self.sic_ranges:
            if range.is_in_range(sic):
                return True
        return False
    
    def sics(self):
        sics = set()
        for range in self.sic_ranges:
            sics.update(range.sics())
        return sics
    
    def names(self):
        return [self.short_name.lower(), self.long_name.lower()] + [range.description.lower() for range in self.sic_ranges]

    def __str__(self):
        return f"{self.id} {self.short_name} {self.long_name} {self.sic_ranges}"
    
    def __repr__(self):
        return self.__str__()

class SICRange():
    def __init__(self, start, end, description):
        assert start <= end
        self.start = start
        self.end = end
        self.description = description
    
    def from_string(string):
        string = string.strip()
        range, description = string.split(" ", 1)
        start, end = range.split("-")
        return SICRange(int(start), int(end), description.strip())
    
    def is_in_range(self, sic):
        return sic >= self.start and sic <= self.end
    
    def sics(self):
        return set(range(self.start, self.end + 1))
    
    def __str__(self):
        return f"{self.start}-{self.end} {self.description}"
    
    def __repr__(self):
        return self.__str__()

def parse(data):
    # base case
    if len(data) == 0:
        return []
    
    # first line is Industry
    industry = Industry.from_string(data[0])

    # the next lines are ranges (until a blank line is found)
    line = 1
    while line < len(data):
        range = SICRange.from_string(data[line])
        industry.add_range(range)
        line += 1

        # skip until next industry
        if data[line] == '\n':
            while line < len(data) and data[line] == '\n':
                line += 1
            break
    
    return [industry] + parse(data[line:])